import { Button } from "react-bootstrap";
import HStack from "../../../components/common/HStack";
import { FiDownload } from "react-icons/fi";
import "../../../style/Button.css"
import "./StudentsPage.css"

export default function StudentsPage() {
    return (
        <div>
            <div className="box-outline" >
                <HStack>
                    <h3>All Students</h3>
                    <Button className="export-btn">
                        <FiDownload className="btn-icon" />
                        Export CSV
                    </Button>
                </HStack>
            </div>

            <div className="box-outline">

            </div>

        </div>

    )
}