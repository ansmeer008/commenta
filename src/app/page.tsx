"use client";

import { useModalStore } from "@/store/simpleModal";

export default function Home() {
  const { openModal } = useModalStore();

  return (
    <div className="text-beige-500">
      <button
        onClick={() =>
          openModal({
            type: "alert",
            message: "열렸나?",
            closeOnOutsideClick: false,
            buttonList: [
              {
                text: "취소",
                onClick: close => {
                  close();
                },
              },
              {
                text: "확인",
                onClick: close => {
                  console.log("요기양");
                  close();
                },
              },
            ],
          })
        }
      >
        click here!
      </button>
      여기에 작성중....
    </div>
  );
}
