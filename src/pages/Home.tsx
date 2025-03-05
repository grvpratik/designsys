
import {Button} from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";

export default function HomePage() {
	

	return (
		<div className="flex gap-2 p-4 dark:bg-background-primary  flex-col ">
			<ModeToggle/>
     
      <div className="flex gap-2"><button className="custom-shadow inline-flex items-center h-[34px]  leading-[1.5] p-2 rounded-button-sm font-medium text-black bg-white   hover:bg-gray-50 active:bg-gray-100 transition duration-200  ">
        Default
      </button>
        <button className="custom-shadowx inline-flex items-center h-[34px]  leading-[1.5]  p-2  rounded-button-sm font-medium  bg-blue-600 text-white    active:bg-blue-700 transition duration-200  ">
          Primary
        </button> <button className="custom-shadow inline-flex items-center h-[34px]  leading-[1.5]  p-2  rounded-button-sm font-medium  bg-white text-blue-600     transition duration-200  ">
          secndary
        </button>


        <button className="custom-shadow text-lg inline-flex items-center h-[42px]  leading-[2]  p-4 rounded-[calc(8/16*1rem)] font-medium text-gray-700 bg-white   hover:bg-gray-50 ">
          Default
        </button>
        <button className="custom-shadowx inline-flex items-center h-[34px]  leading-[1.5] p-s rounded-[calc(8/16*1rem)] font-medium text-gray-700 bg-white   hover:bg-gray-50 ">
          Default
        </button> </div>
      
    
		

		</div>
	);
}
