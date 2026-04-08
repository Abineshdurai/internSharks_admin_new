import { Button } from "react-bootstrap";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { FiDownload } from "react-icons/fi";

export default function ApplicationPage() {
    return (
       
            <div className="page-container">
                <div className="students-header">
                    <h2>Applications</h2>
                    <HStack gap={10}>
                        {/* <SearchBar
                            value={searchText}
                            onChange={(value) => dispatch(setSearchText(value))}
                            placeholder="Search internship..."
                        /> */}
                        <Button className="btn export-btn">
                            <FiDownload className="btn-icon" />
                            Export CSV
                        </Button>
                    </HStack>
                </div>
            </div>
        
    )
}