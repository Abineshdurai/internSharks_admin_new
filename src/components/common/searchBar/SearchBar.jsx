
import { ReactComponent as SearchIcon } from "../../../assets/icons/searchIcon.svg"
import "./SearchBar.css"

export default function SearchBar({
    value = "",
    onChange,
    placeholder = "Search...",
    // width = "280px",
}) {
    return (
        <div className="searchbar" >
            <SearchIcon className="searchbar-icon"/>
            <input
            className="searchbar-input"
                text="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}