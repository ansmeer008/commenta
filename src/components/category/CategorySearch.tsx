"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { ListPlus, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Category, addCategory, searchCategoryList } from "@/apis/category";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm } from "@/hooks/useForm";

const SearchList = ({
  list,
  selectHandler,
  selectBtnText,
}: {
  list: Category[];
  selectHandler?: (select: Category) => void;
  selectBtnText?: string;
}) => {
  const { open, close } = useSimpleModal();

  const handleCustomContent = () => {
    open({
      type: "confirm",
      message: null,
      customContent: <AddCategoryModalContent close={close} />,
      buttonList: [],
    });
  };
  return (
    <ul className="absolute bg-gray-100 z-10 left-0 right-0 rounded-b-md shadow-md">
      {list.map((item: Category) => {
        return (
          <li key={item.id} className="p-2 flex justify-between border-b-1 border-gray-200">
            <div>
              <p>
                {item.title}({item.author})
              </p>
              <p className="text-xs text-gray-500">
                언급 {item.usageCount}회, 구독 {item.subscribeCount}회
              </p>
            </div>
            {selectHandler && (
              <div>
                <Button
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation();
                    if (selectHandler) {
                      selectHandler(item);
                    }
                  }}
                  onMouseDown={e => e.preventDefault()}
                >
                  <span className="text-xs text-gray-700">{selectBtnText ?? "구독하기"}</span>
                  <ListPlus size={20} />
                </Button>
              </div>
            )}
          </li>
        );
      })}

      <li
        className="flex justify-center items-center gap-2 p-2 cursor-pointer bg-gray-50 rounded-b-lg"
        onClick={handleCustomContent}
      >
        <Plus size={16} />
        직접 입력하기
      </li>
    </ul>
  );
};

const AddCategoryModalContent = ({ close }: { close: () => void }) => {
  const { values, setFieldValue } = useForm({
    title: "",
    author: "",
  });

  // TODO:: check if duplicated tag
  const handleSave = async () => {
    const { title, author } = values;
    if (title.length && author.length) {
      const newCategory = await addCategory({ title, author });

      if (newCategory) {
        toast(`${title}(${author}) 작품이 등록되었습니다!`);
        close();
      }
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="font-bold text-lg">작품 등록</h2>
      <Input
        name="title"
        value={values.title}
        onChange={e => {
          setFieldValue("title", e.target.value);
        }}
        placeholder="작품 제목"
      />
      <Input
        name="author"
        value={values.author}
        onChange={e => {
          setFieldValue("author", e.target.value);
        }}
        placeholder="작가명"
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={close}>
          취소
        </Button>
        <Button onClick={handleSave}>등록</Button>
      </div>
    </div>
  );
};

export const CategorySearch = ({
  className,
  selectHandler,
  selectBtnText,
}: {
  className?: string;
  selectHandler?: (select: Category) => void;
  selectBtnText?: string;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("flex gap-2", className)} ref={wrapperRef}>
      <div className="relative w-full flex-4/5 md:flex-7/8">
        <div>
          <Input
            placeholder="원하는 작품을 찾아보세요"
            onChange={e => {
              setSearch(e.target.value);
            }}
            value={search ?? ""}
            onFocus={() => setIsOpen(true)}
          />
        </div>
        {isOpen && (
          <SearchList
            list={categoryList}
            selectBtnText={selectBtnText}
            selectHandler={category => {
              if (selectHandler) {
                selectHandler(category);
                setSearch("");
              }
            }}
          />
        )}
      </div>
      <Button
        className="flex-1/5 md:flex-1/8"
        onClick={async () => {
          if (search.trim().length) {
            const list = await searchCategoryList(search);
            setCategoryList(list);
          } else {
            setCategoryList([]);
          }
        }}
      >
        <Search size={10} />
      </Button>
    </div>
  );
};
