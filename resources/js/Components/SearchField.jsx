import TextInput from "@/Components/TextInput";
import { Button } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchField = ({ onValueChange, onSearch }) => {
    // Function to handle key down events
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(); // Call the search function when Enter is pressed
        }
    };

    return (
        <div className="mx-5 mb-2 mt-2 flex ">
            <TextInput
                onInput={(e) => {
                    onValueChange(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                type="text"
                className=" rounded-e-none"
                placeholder="Search"
            />
            <Button onClick={onSearch} className="rounded-s-none items-center">
                <HiOutlineSearch />
            </Button>
        </div>
    );
};

export default SearchField;
