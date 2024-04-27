import { Textarea } from "@/components/ui/textarea";
import type {
  IGenreAndTagsProps,
  IInputForEditProps,
  IMetaDataGameProps,
  ITextareaForEditProps,
  ISetNewPriceProps,
} from "../types/types";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import ContextMenuUI from "@/components/contextMenu/contextMenu";
import { AddNewTagOrGenre } from "@/components/addNew/addNewTagOrGenre";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";

export const TextareaForEdit: React.FC<ITextareaForEditProps> = ({
  width = "500",
  form,
  role,
}) => {
  return (
    <form.Field
      name={role}
      children={(field: any) => (
        <Textarea
          name={field.name}
          value={field.state.value}
          rows={5}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={`text-xl text-muted-foreground w-[${width}px] italic w- rounded-lg border bg-card text-card-foreground shadow`}
        />
      )}
    />
  );
};

export const InputForEdit: React.FC<IInputForEditProps> = ({
  additionClassName,
  form,
  role,
}) => {
  return (
    <form.Field
      name={role}
      children={(field: any) => (
        <Input
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={`pb-0 tracking-tight text-2xl font-extrabold mb-1 ${additionClassName} rounded-lg border bg-card text-card-foreground shadow`}
        />
      )}
    />
  );
};

export const CalendarGameReleaseDate: React.FC<{ form?: any }> = ({ form }) => {
  const releaseDate = form?.getFieldValue("releaseDate");
  const dateStringToDate = (dateString : string) => {
    const parts = dateString.split("-"); 
    const day = parseInt(parts[0], 10); 
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10); 
    return new Date(year, month, day);
  };
  return (
    <form.Field name="releaseDate">
      {(field: any) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button>Release date</Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateStringToDate(field.state.value)}
              defaultMonth={dateStringToDate(field.state.value)}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      )}
    </form.Field>
  );
};

export const MetaDataGame: React.FC<IMetaDataGameProps> = ({
  publisher,
  developer,
  releaseDate,
  form,
}) => {
  return (
    <>
      <p className="text-[19px] text-muted-primary font-bold w-96">
        Publisher: {publisher}
      </p>
      <p className="text-[19px] text-muted-primary font-bold w-96">
        Developer: {developer}
      </p>
      <CalendarGameReleaseDate form={form} />
    </>
  );
};

export const GenreAndTags: React.FC<IGenreAndTagsProps> = ({
  items,
  type,
  allGenreOrTags,
  form,
}) => {
  const isTags = type === "Tags";
  const classNameForTagsWrapper = isTags && "w-96";
  const badgeType = isTags ? "outline" : "default";
  const marginForTags = isTags ? "mb-1 ml-1" : "";

  return (
    <form.Field name={type.toLowerCase()}>
      {(field: any) => {
        return (
          <>
            <p className="text-xl text-muted-primary font-bold">{type}</p>
            <div
              className={`flex flex-row flex-wrap items-center  ${classNameForTagsWrapper}`}
            >
              {field.state.value &&
                field.state.value.map((item: { name: string; id: number }) => (
                  <ContextMenuUI id={item.id} field={field}>
                    <Badge className={marginForTags} variant={badgeType}>
                      {item.name}
                    </Badge>
                  </ContextMenuUI>
                ))}
              <div className="mt-1">
                <AddNewTagOrGenre
                  allGenreOrTags={allGenreOrTags}
                  field={field}
                />
              </div>
            </div>
          </>
        );
      }}
    </form.Field>
  );
};

export const SetNewPrice: React.FC<ISetNewPriceProps> = ({ form }) => {
  const [open, setOpen] = useState(false);

  const maxDiscount = 90;
  const minDiscount = 0;
  const discountIndex = 15;

  return (
    <>
      <Label className="text-xl text-muted-primary font-bold" htmlFor="email">
        Price (UAH)
      </Label>
      <div className="flex flex-row space-x-2 mb-1">
        <form.Field
          name={"price"}
          children={(field: any) => (
            <Input
              name={field.name}
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="text-xl text-muted-primary font-bold rounded-lg border bg-card text-card-foreground shadow"
            />
          )}
        />
        <form.Field name={"discount"}>
          {(field: any) => {
            return (
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button onClick={() => setOpen(true)}>Change discount</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Change discount</DrawerTitle>
                      <DrawerDescription>
                        Set discount for this game
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() =>
                            field.state.value > minDiscount &&
                            field.handleChange(
                              field.state.value - discountIndex
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {field.state.value} %
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() =>
                            field.state.value < maxDiscount &&
                            field.handleChange(
                              field.state.value + discountIndex
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button
                        type="submit"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Submit
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            );
          }}
        </form.Field>
      </div>
    </>
  );
};
