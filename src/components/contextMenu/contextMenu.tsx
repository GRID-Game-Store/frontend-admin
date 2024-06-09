import React from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu" 
interface IContextMenuUIProps {
    children: React.ReactNode
    id: number
    field: any

}
const ContextMenuUI: React.FC<IContextMenuUIProps> = ({children, id, field}) => {
  const handleDelete = () => {
    const index = field.state.value.findIndex((item : any) => {
      
        return item.id === id
    });
    if (index !== -1) {
        field.setValue(field.state.value.toSpliced(index, 1));
    }
}
  return (
    <div>
      <ContextMenu >
        <ContextMenuTrigger className="ml-[3px] cursor-pointer">{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => handleDelete()} className="text-red-500">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default ContextMenuUI;
