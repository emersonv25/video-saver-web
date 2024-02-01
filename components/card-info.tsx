import { InfoVideoDto } from "@/types/VideoDto";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";

export default function CardInfo({ videoInfo }: { videoInfo: InfoVideoDto }) {
  const items = [{
    value: '22',
    label: 'MP4 - HD - (1280x720)'
  }]
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 mt-4 mb-4"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Video Thumb"
              className="object-cover"
              height={200}
              shadow="md"
              src={videoInfo.thumbnail}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1 className="text-large font-medium mt-2">{videoInfo.title}</h1>
                <p className="text-small text-foreground/80">{videoInfo.duration}</p>
                <div className="mt-2 mb-4 w-96">
                  <Select
                    items={videoInfo.formats}
                    placeholder="Selecione o formato"
                    size="sm"
                  >
                    {(format) => <SelectItem key={format.format_id}>{getFormatSelect(format)}</SelectItem>}
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                className="data-[hover]:bg-foreground/10"
                radius="full"
                color="success"
                variant="shadow"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
function getFormatSelect(format: any) {
  let ext = format.ext ? `${format.ext.toUpperCase()} - ` : '';
  let quality = getQuality(format.resolution);
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
  if(resolution == 'audio only')
  {
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
  } else  {
    return 'SD';
  }
}