import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Edit3, X } from "lucide-react";
import { useState } from "react";
import { Setting } from "@/services/settings-service";
import { useToast } from "@/hooks/use-toast";

interface SettingCardProps {
  setting: Setting;
  onUpdate: (id: string, value: string) => void;
  isUpdating?: boolean;
}

export default function SettingCard({
  setting,
  onUpdate,
  isUpdating,
}: SettingCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(setting.value);
  const { toast } = useToast();

  const handleSave = () => {
    if (editValue !== setting.value) {
      onUpdate(setting.id, editValue);
      toast({
        title: "تنظیمات به‌روزرسانی شد",
        description: `${setting.key} با موفقیت به‌روزرسانی شد.`,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(setting.value);
    setIsEditing(false);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "boolean":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "number":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "string":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const formatValue = (value: string, type: string) => {
    if (type === "boolean") {
      return value === "true" ? "فعال" : "غیرفعال";
    }
    if (type === "number") {
      return new Intl.NumberFormat("fa-IR").format(Number(value));
    }
    return value;
  };

  const renderInput = () => {
    if (setting.type === "boolean") {
      return (
        <div className="flex items-center space-x-2 space-x-reverse">
          <Switch
            checked={editValue === "true"}
            onCheckedChange={(checked) => setEditValue(checked.toString())}
            disabled={!isEditing}
          />
          <Label className="text-sm text-cream/80">
            {editValue === "true" ? "فعال" : "غیرفعال"}
          </Label>
        </div>
      );
    }

    if (setting.type === "number") {
      return (
        <Input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          disabled={!isEditing}
          className="bg-navy/30 border-gold/20 text-cream"
          dir="ltr"
        />
      );
    }

    return (
      <Input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        disabled={!isEditing}
        className="bg-navy/30 border-gold/20 text-cream"
      />
    );
  };

  return (
    <Card className="bg-navy/50 border-gold/20 hover:border-gold/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gold text-lg">{setting.key}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getTypeBadgeColor(setting.type)}>
              {setting.type}
            </Badge>
            {!isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                <Edit3 className="h-4 w-4 ml-1" />
                ویرایش
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-cream/80 text-sm">مقدار فعلی:</Label>
          {!isEditing ? (
            <div className="p-3 bg-navy/30 rounded-lg border border-gold/10">
              <span className="text-cream font-mono">
                {formatValue(setting.value, setting.type)}
              </span>
            </div>
          ) : (
            renderInput()
          )}
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Save className="h-4 w-4 ml-1" />
              {isUpdating ? "در حال ذخیره..." : "ذخیره"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="border-red-400/30 text-red-400 hover:bg-red-400/10"
            >
              <X className="h-4 w-4 ml-1" />
              لغو
            </Button>
          </div>
        )}

        <div className="text-xs text-cream/50 pt-2 border-t border-gold/10">
          <div>
            آخرین به‌روزرسانی:{" "}
            {new Date(setting.updatedAt).toLocaleDateString("fa-IR")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
