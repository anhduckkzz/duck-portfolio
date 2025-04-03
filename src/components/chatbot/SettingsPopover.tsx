
import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Settings, Unlock, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from "@/components/ui/drawer";

interface SettingsPopoverProps {
  isAdminMode: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  modelName: string;
  setModelName: (name: string) => void;
}

export const SettingsPopover = ({ 
  isAdminMode, 
  apiKey, 
  setApiKey, 
  modelName, 
  setModelName 
}: SettingsPopoverProps) => {
  const isMobile = useIsMobile();
  
  const SettingsContent = () => (
    <div className="space-y-4">
      <h4 className="font-medium">Settings</h4>
      <div className="space-y-2">
        {isAdminMode ? (
          <>
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Unlock className="h-4 w-4" /> OpenRouter API Key 
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="bg-background dark:bg-darkmode-card"
            />
            <label className="text-sm text-muted-foreground">
              Model Name
            </label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter model name"
              className="bg-background dark:bg-darkmode-card"
            />
          </>
        ) : (
          <div className="py-2 flex items-center justify-center">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Current model: {modelName}
        </p>
      </div>
    </div>
  );
  
  // Use drawer for mobile, popover for desktop
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-4">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <SettingsContent />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 popover-content">
        <SettingsContent />
      </PopoverContent>
    </Popover>
  );
};
