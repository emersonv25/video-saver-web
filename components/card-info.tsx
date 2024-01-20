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
                    {(item) => <SelectItem key={item.format_id}>{`${item.ext} - (${item.resolution}) - ${item.fps ? item.fps + 'fps' : ''} ${item.filesize ? ' - (' + bytesToMiB(item.filesize) + 'MiB)' : ''}`}</SelectItem>}
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
function bytesToMiB(bytes: number) {
  const mebibytes = bytes / Math.pow(2, 20);
  return Math.round(mebibytes);
}