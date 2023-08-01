import { useDispatch } from "react-redux";
import { addWidget, widgetConstants } from "@chaitali-nagalkar-amla/editor";
export function AddTextWidget() {
  const dispatch = useDispatch();
  const addText = document.getElementById("artifi-add-text");
  const viewCode = addText?.getAttribute("data-view-code") ?? "";
  return (
    <>
      {addText && (
        <div>
          <button
            className="inline-block rounded-md border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            onClick={(e) => {
              dispatch(
                addWidget({
                  type: widgetConstants.TEXTBOX,
                })
              );
            }}
          >
            Add Text
          </button>
        </div>
      )}
    </>
  );
}
