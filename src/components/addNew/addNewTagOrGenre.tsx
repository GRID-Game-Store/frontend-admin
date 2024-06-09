import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import type { AllGenreAndTagsResponse } from "@/types/types";
import { useState } from "react";

interface IAddNewTagOrGenreProps {
  allGenreOrTags: AllGenreAndTagsResponse;
  field: any;
  max: number;
}
interface IChangePermitAgeProps {
  allAges: AllGenreAndTagsResponse;
  field: any;
}

export const ChangePermitAge: React.FC<IChangePermitAgeProps> = ({
  allAges,
  field,
}) => {
  const handleAdd = (value: any) => {
    field.setValue(value);
  };

  return (
    <div className="flex ">
      <Select value={field.state.value} onValueChange={handleAdd}>
        <SelectTrigger className="h-[26px] ml-2 ">
          <SelectValue className="pr-4" />
        </SelectTrigger>
        <SelectContent>
          {allAges &&
            allAges.map((age) => (
              <SelectItem key={age.id} value={age.name}>
                {age.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const AddNewTagOrGenre: React.FC<IAddNewTagOrGenreProps> = ({
  allGenreOrTags,
  field,
  max,
}) => {
  const [value, setValue] = useState<string>("");
  const handleAdd = (value: string) => {
    const valueToPush = JSON.parse(value);
    const isDuplicate = field.state.value.some(
      (item: any) => item.id === valueToPush.id
    );
    if ((!isDuplicate && max === 0) || field.state.value.length < max) {
      field.setValue([...field.state.value, valueToPush]);
    }
  };

  return (
    <div className="flex ">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-[26px] ml-2 ">
          <SelectValue
            placeholder={`Select ${field.name}`}
            className="pr-4"
          />
        </SelectTrigger>
        <SelectContent>
          {allGenreOrTags &&
            allGenreOrTags.map((genreOrTag) => (
              <SelectItem
                key={genreOrTag.id}
                value={JSON.stringify(genreOrTag) || ""}
              >
                {genreOrTag.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {field.state.value.length < max && (
        <Button onClick={() => handleAdd(value)} className="h-[26px] ml-2">
          Add
        </Button>
      )}
      {max === 0 && (
        <Button onClick={() => handleAdd(value)} className="h-[26px] ml-2">
          Add
        </Button>
      )}
    </div>
  );
};

export { AddNewTagOrGenre };
