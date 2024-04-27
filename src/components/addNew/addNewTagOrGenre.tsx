
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SelectIcon } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import type { AllGenreAndTagsResponse } from "@/types/types";
import { useState } from "react";

interface IAddNewTagOrGenreProps {
    allGenreOrTags: AllGenreAndTagsResponse
    field: any
}


const AddNewTagOrGenre: React.FC<IAddNewTagOrGenreProps> = ({allGenreOrTags, field}) => {
  const [value, setValue] = useState<string>("");

  const handleAdd = (value: string) => {
      const valueToPush = JSON.parse(value);
      console.log(valueToPush, field.state.value.includes(valueToPush), field.state.value);
      const isDuplicate = field.state.value.some((item : any) => item.id === valueToPush.id);
      if (!isDuplicate) {
          field.setValue([...field.state.value, valueToPush]);
      }
  }

    

  return (

    <div className="flex ">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-[26px] ml-2 ">
          <SelectValue placeholder="Select new genre" className="pr-4"  />
        </SelectTrigger>
        <SelectContent>
          {allGenreOrTags && allGenreOrTags.map((genreOrTag) => (
            <SelectItem key={genreOrTag.id} value={ JSON.stringify(genreOrTag)  || ""} >
              {genreOrTag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={() => handleAdd(value)} className="h-[26px] ml-2">Add</Button>
    </div>
  );
};

export { AddNewTagOrGenre };
