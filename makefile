dev:
	make -j2 watch

watch: tar1 tar2

tar1:
	cd web; CSB=true yarn dev
tar2:
	fastly compute serve --watch-dir="src" --watch

build:
	cd web; yarn build; cd ..; fastly compute build

