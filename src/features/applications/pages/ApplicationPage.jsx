import { Button } from "react-bootstrap";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { FiDownload } from "react-icons/fi";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ApplicationPage() {

    const [headerNode, setHeaderNode] = useState(null);
    useEffect(() => {
        setHeaderNode(document.getElementById("admin-header-actions"));
    })
    return (
       
            <div className="page-container">
                {headerNode &&
                        createPortal(
                          <div className="header-actions-container" style={{ position: "relative", display: "inline-block" }}>
                            <select
                              className="form-select custom-header-select"
                            //   value={apiname || ""}
                            //   onChange={(e) => dispatch(setApiname(e.target.value))}
                              style={{
                                padding: "6px 32px 6px 12px",
                                borderRadius: "6px",
                                border: "1px solid var(--color-border)",
                                background: "var(--color-surface)",
                                color: "var(--color-text-primary)",
                                appearance: "none",
                                WebkitAppearance: "none",
                                cursor: "pointer"
                              }}
                            >
                              <option value="">All</option>
                              <option value="analyze-resume">Analyze Resume</option>
                              <option value="extract-resume">Extract Resume</option>
                              <option value="generate-banner">Generate Banner</option>
                              <option value="verify-kyc">Verify KYC</option>
                              <option value="enhance-resume">Enhance Resume</option>
                              <option value="generate-syllabus">Generate Syllabus</option>
                              <option value="watermark-remove">Watermark Remove</option>
                              <option value="mcq-score">MCQ Score</option>
                            </select>
                            <div style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--color-text-secondary)", display: "flex" }}>
                              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                          </div>,
                          headerNode,
                        )}
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