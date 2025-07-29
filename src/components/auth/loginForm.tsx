import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export default function LoginForm() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] grid items-center gap-3">
        <Label htmlFor="id">ID</Label>
        <Input id="id" type="text" />
        <Label htmlFor="pswd">Password</Label>
        <Input id="pswd" type="text" />

        <Button size="lg">로그인</Button>
      </div>
    </div>
  );
}
