'use clint'
import { InfoVideoDto } from "@/types/VideoDto";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";
import { url } from "inspector";
import { ChangeEvent, useState } from "react";


export default function CardInfo({ videoInfo }: { videoInfo: InfoVideoDto }) {

  const [formatId, setFormatId] = useState('best');

  const downloadDireto = (format_id: string) => {
    const format = videoInfo.formats.find((f) => f.format_id === format_id);
    // Usando a API Fetch para obter os dados do vídeo
    fetch(format.url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${videoInfo.title}.${format.ext}`;
        link.target = '_blank';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      })
      .catch(error => console.error('Erro ao realizar o download:', error));
  };

  const download = async (format_id: string) => {
    const format = videoInfo.formats.find((f) => f.format_id === format_id);
    const downloadUrl = `${process.env.NEXT_PUBLIC_API}/video/download?url=${encodeURIComponent(format.url)}&format=${encodeURIComponent(format_id)}`;
    window.open(downloadUrl, '_blank');

    // const response = await fetch(`${process.env.NEXT_PUBLIC_API}/video/download?url=${url}&format=${format}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    // const blob = await response.blob();
    // const urlBlob = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = urlBlob;

    // const contentDisposition = response.headers.get('Content-Disposition');
    // let fileName = 'video.mp4'; // default name

    // if (contentDisposition) {
    //   const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    //   if (fileNameMatch && fileNameMatch[1]) {
    //     fileName = fileNameMatch[1].replace(/['"]/g, '');
    //   }
    // }

    // link.setAttribute('download', fileName);
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 mt-4 mb-4"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative flex mb-4 md:mb-0 md:mr-4 max-w-md">
            <Image
              alt="Video Thumb"
              className="object-cover"
              shadow="md"
              src={videoInfo.thumbnail}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <div className="flex flex-col gap-0">
                <h1 className="text-large font-medium mt-2">{videoInfo.title}</h1>
                <p className="text-small text-foreground/80">{videoInfo.duration}</p>

                <div className="mt-2 mb-4 w-96 flex">
                  <Select
                    items={videoInfo.formats}
                    placeholder="Selecione o formato"
                    aria-label="Seleção de formato"
                    size="sm"
                    defaultSelectedKeys=""
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setFormatId(event.target.value)}
                  >
                    {videoInfo.formats.map((format, index) =>
                      <SelectItem key={`${format.format_id}-${index}`} value={format.format_id}>
                        {getFormatSelect(format)}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Button
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    color="success"
                    variant="shadow"
                    // onClick={() => download(videoInfo.url, format)}
                    onClick={() => downloadDireto(formatId)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
function getFormatSelect(format: any) {
  let ext = format.ext ? `${format.ext.toUpperCase()}` : '';
  let quality = getQuality(format.resolution);
  quality = quality ? ' - ' + quality : '';
  let resolution = format.resolution ? ` - (${format.resolution})` : '';
  let fps = format.fps ? ` - ${format.fps} fps` : '';
  let size = format.filesize ? ` - (${bytesToMiB(format.filesize)} MiB)` : '';

  return ext + quality + resolution + fps + size;
}

function bytesToMiB(bytes: number) {
  const mebibytes = bytes / Math.pow(2, 20);
  return Math.round(mebibytes);
}

function getQuality(resolution: string) {
  if (!resolution || resolution == 'audio only') {
    return '';
  }
  const [width, height] = resolution.split('x').map(Number);
  const pixels = height >= width ? height : width;

  if (pixels >= 2160) {
    return '4K';
  } else if (pixels >= 1440) {
    return 'Quad HD';
  } else if (pixels >= 1080) {
    return 'Full HD';
  } else if (pixels >= 720) {
    return 'HD';
  } else {
    return 'SD';
  }
}