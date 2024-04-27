import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputLink: React.FC<IInputLinkProps> = ({form, role}) => {
  return (
    <form.Field name={role}>
      {(field: any) => (
        <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor={role}>{role} URL</Label>
        <Input
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="col-span-2 h-8"
        />
        </div>
      )}
    </form.Field>
    
  );
};

interface IChangeGalleryProps {
  form: any;
}
interface IInputLinkProps {
  form: any;
  role: string;
}
// bannerImageUrl: game.gameMedia?.bannerUrl,
//       trailerUrl: game.gameMedia?.trailer,
//       screenshotUrl: game.gameMedia?.screenshotUrl,
//       trailerScreenshotUrl: game.gameMedia?.trailerScreenshot,

const ChangeGallery: React.FC<IChangeGalleryProps> = ({ form }) => {
  return (
    <div className="grid gap-4 bg-white p-4 rounded-lg border bg-card text-card-foreground shadow">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Images</h4>
            <p className="text-sm text-muted-foreground">Set new images.</p>
          </div>
          <div className="grid gap-2">
            <InputLink form={form} role="bannerImageUrl" />
            <InputLink form={form} role="trailerUrl" />
            <InputLink form={form} role="screenshotUrl" />
            <InputLink form={form} role="trailerScreenshotUrl" />
          </div>
        </div>
  );
};

export { ChangeGallery };
