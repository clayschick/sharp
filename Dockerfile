FROM marcbachmann/libvips
MAINTAINER Clay Schick <clay.schick@gmail.com>

WORKDIR opt/

RUN apt-get update

RUN apt-get install -y curl build-essential \
	&& curl --silent --location https://deb.nodesource.com/setup_4.x | bash - \
	&& apt-get install -y nodejs nano \
	&& npm install -g sharp
