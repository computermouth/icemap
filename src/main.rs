//! Default Compute template program.

use fastly::error::anyhow;
use fastly::http::{header, Method, StatusCode};
use fastly::{mime, Body, Error, Request, Response};
use rust_embed::Embed;

fn handle_api(_req: Request) -> Result<Response, Error> {
    Ok(Response::from_status(StatusCode::OK).with_body_text_plain("Doing API stuff!\n"))
}

#[derive(Embed)]
#[folder = "web/"]
struct Asset;

/// The entry point for your application.
///
/// This function is triggered when your service receives a client request. It could be used to
/// route based on the request properties (such as method or path), send the request to a backend,
/// make completely new requests, and/or generate synthetic responses.
///
/// If `main` returns an error, a 500 error response will be delivered to the client.
#[fastly::main]
fn main(req: Request) -> Result<Response, Error> {
    // Log service version
    println!(
        "FASTLY_SERVICE_VERSION: {}",
        std::env::var("FASTLY_SERVICE_VERSION").unwrap_or_else(|_| String::new())
    );

    // Filter request methods...
    match req.get_method() {
        // Block requests with unexpected methods
        &Method::POST | &Method::PUT | &Method::PATCH | &Method::DELETE => {
            return Ok(Response::from_status(StatusCode::METHOD_NOT_ALLOWED)
                .with_header(header::ALLOW, "GET, HEAD, PURGE")
                .with_body_text_plain("This method is not allowed\n"))
        }

        // Let any other requests through
        _ => (),
    };

    let path = match req.get_path() {
        "/" => "index.html",
        p => p,
    };

    if path.starts_with("/api/") {
        handle_api(req)
    } else {
        let path = path.trim_start_matches('/');
        let file = match Asset::get(path) {
            Some(s) => Some(s),
            None => Asset::get("index.html"),
        }
        .ok_or(anyhow!("failed to find or substitute '{}'", path))?;

        Ok(Response::from_status(StatusCode::OK).with_body(file.data.into_owned()))
    }
}
