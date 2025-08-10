import { useState } from "react";
import { Switch } from "../ui/switch";

export const NoSpoilerModeSection = () => {
  const [isNoSpoilerMode, setIsNoSpoilerMode] = useState(true);
  return (
    <div className="flex flex-col border-1 rounded-lg p-4 flex-1">
      <div className="flex justify-between items-center">
        <div className="font-bold">
          <span className="mr-1 font-normal">스포일러 방지 모드</span>
          {isNoSpoilerMode ? (
            <span className="text-green-500">켰어요</span>
          ) : (
            <span className="text-red-600">껐어요</span>
          )}
        </div>
        <Switch
          checked={isNoSpoilerMode}
          onCheckedChange={checked => {
            setIsNoSpoilerMode(checked);
          }}
        />
      </div>
      <p className="text-xs text-gray-300">지정한 회차 이상의 코멘터리는 노출되지 않습니다</p>
    </div>
  );
};
