import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  IAboutGameProps,
  ITitleAndDescriptionProps,
} from "../types/types";
import { InputForEdit, TextareaForEdit } from "./blocksForForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormApi, useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";

export const AboutGame: React.FC<IAboutGameProps> = ({ form }) => {
  return (
    <>
      <h2 className="pb-0 tracking-tight text-2xl font-extrabold">
        About Game
      </h2>
      <TextareaForEdit width="730" form={form} role="aboutGame" />
    </>
  );
};

export const TitleAndDescription: React.FC<ITitleAndDescriptionProps> = ({
  form,
}) => {
  return (
    <>
      <InputForEdit form={form} role="title" />
      <TextareaForEdit form={form} role="description" />
    </>
  );
};

interface ISysReqSelectProps {
  options?: string[];
  role: string;
  field: any;
}

const SysReqSelect: React.FC<ISysReqSelectProps> = ({
  options,
  role,
  field,
}) => {
  return (
    <Select
      value={field.state.value}
      onValueChange={(value: string) => field.setValue(value)}
    >
      <SelectTrigger className="h-[26px]">
        <SelectValue
          placeholder={`Select ${role.toLowerCase()}`}
          className="pr-4"
        />
      </SelectTrigger>
      <SelectContent>
        {options &&
          options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
type ISysReqState = {
  [key: string]: {
    minimum: string[];
    recommended: string[];
  };
};
const sysReqState: ISysReqState = {
  OS: {
    minimum: ["Windows 10"],
    recommended: ["Windows 11"],
  },
  Processor: {
    minimum: [
      "Intel Core i7-7700K/AMD Ryzen 5 1600X",
      "Intel Core i3-12100F/AMD Ryzen 7 1700",
      "Intel Core i5-10400F/AMD Ryzen 7 2700X",
    ],
    recommended: [
      "Intel Core i7-7700K/AMD Ryzen 5 1600X",
      "Intel Core i3-12100F/AMD Ryzen 7 1700",
      "Intel Core i5-10400F/AMD Ryzen 7 2700X",
      "	AMD Ryzen 5 3600X/Intel Core i5-10400",
      "AMD Ryzen 5 5600X/Intel Core i5-11400",
      "Intel Core i9-11900K/AMD Ryzen 7 7700",
      "	Intel Core i5-13600K/AMD Ryzen 9 5900X",
    ],
  },
  Memory: {
    minimum: ["8 GB RAM", "6 GB RAM", "4 GB RAM"],
    recommended: ["16 GB RAM", "12 GB RAM", "8 GB RAM", "6 GB RAM", "4 GB RAM"],
  },
  Graphics: {
    minimum: [
      "AMD Radeon RX 570",
      "NVIDIA GeForce GTX 1060",
      "NVIDIA GeForce GTX 1070",
      "NVIDIA GeForce GTX 1080 Ti",
      "NVIDIA GeForce GTX 1660 Ti",
      "NVIDIA GeForce RTX 2060",
      "NVIDIA GeForce RTX 3050",
    ],
    recommended: [
      "AMD Radeon RX 570",
      "NVIDIA GeForce GTX 1060",
      "NVIDIA GeForce GTX 1070",
      "NVIDIA GeForce GTX 1080 Ti",
      "NVIDIA GeForce GTX 1660 Ti",
      "NVIDIA GeForce RTX 2060",
      "NVIDIA GeForce RTX 3050",
      "NVIDIA GeForce RTX 2080",
      "NVIDIA GeForce RTX 3060",
      "NVIDIA GeForce RTX 4060",
      "NVIDIA GeForce RTX 4070",
      "NVIDIA GeForce RTX 3080",
    ],
  },
  Storage: {
    minimum: ["25 GB", "50 GB", "100 GB", "250 GB"],
    recommended: ["25 GB", "50 GB", "100 GB", "250 GB"],
  },
  DirectX: {
    minimum: ["Version 11", "Version 12"],
    recommended: ["Version 11", "Version 12"],
  },
};

interface ISysReqItemProps {
  title: string;
  options?: string[];
  form: FormApi<TFormFields, undefined>;
}

const SysReqItem: React.FC<ISysReqItemProps> = ({ title, options, form }) => {
  return (
    <div className="flex flex-row space-x-2">
      <h3 className="tracking-tight text-xl font-extrabold w-max mb-2">
        {title}:
      </h3>
      <form.Field
        name={title as keyof TFormFields}
        children={(field: any) => (
          <SysReqSelect role={title} options={options} field={field} />
        )}
      />
    </div>
  );
};

type TFormFields = {
  OS: string;
  Processor: string;
  Memory: string;
  Graphics: string;
  Storage: string;
  DirectX: string;
};

interface ISysReqProps {
  formMinimum: FormApi<TFormFields, undefined>;
  formRecommended: FormApi<TFormFields, undefined>;
  step: "minimum" | "recommended";
}

export const SysReq: React.FC<ISysReqProps> = ({
  formMinimum,
  formRecommended,
  step,

  
}) => {
  return (
    <div className="flex flex-row space-x-2 mb-1">
      <Tabs value={step} className="w-[400px]">
        <TabsList>
          <TabsTrigger value="minimum">Minimum</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="minimum">
          <div className="w-[460px] grid gap-4 bg-white p-4 rounded-lg border bg-card text-card-foreground shadow  ">
            {Object.keys(sysReqState).map((key) => (
              <SysReqItem
                key={key}
                title={key}
                options={sysReqState[key].minimum}
                form={formMinimum}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended">
          <div className="w-[460px] grid gap-4 bg-white p-4 rounded-lg border bg-card text-card-foreground shadow  ">
            {Object.keys(sysReqState).map((key) => (
              <SysReqItem
                key={key}
                title={key}
                options={sysReqState[key].recommended}
                form={formRecommended}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const formSysReq = {
  OS: "",
  Processor: "",
  Memory: "",
  Graphics: "",
  Storage: "",
  DirectX: "",
};

interface IDialogSysReqProps {
  field: any;

}
const generateSysReq = (value: TFormFields, type : "MINIMUM" | "RECOMMENDED" ) => {
  let sysReqText = `${type}:  Requires a 64-bit processor and operating system  `
      Object.keys(value).map((key) => {
        sysReqText += `${key}: ${value[key as keyof typeof value]}  `
  })
  return sysReqText
}





export const DialogSysReq: React.FC<IDialogSysReqProps> = ({field}) => {
  const [step, setStep] = useState<"minimum" | "recommended">("minimum");
  const [visible, setVisible] = useState(false);
  const formMinimum = useForm({
    defaultValues: formSysReq,
    onSubmit: ({value}) => {
      field.handleChange(generateSysReq(value, "MINIMUM"));
      setStep("recommended");
    },
  });
  const formRecommended = useForm({
    defaultValues: formSysReq,
    onSubmit: ({value}) => {
      field.handleChange(field.state.value + generateSysReq(value, "RECOMMENDED"));
      setVisible(false);
      setStep("minimum");
    }
  });

  return (
    <Dialog open={visible} onOpenChange={setVisible} >
      <DialogTrigger>
        <Button className="w-full" onClick={() => setVisible(true)}>Set system requirements</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>System requirements</DialogTitle>
          <DialogDescription>
            Please enter the minimum and recommended system requirements for
            your game. These are the basic specifications needed for the game to
            run.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            step === "minimum" && formMinimum.handleSubmit();
            step === "recommended" && formRecommended.handleSubmit();
          }}
        >
          <SysReq formMinimum={formMinimum} formRecommended={formRecommended} step={step}  />
          <Button className="w-full" type="submit">
            Next {"->"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
