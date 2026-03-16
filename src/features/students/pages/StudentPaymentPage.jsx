import { Button } from "react-bootstrap";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { FiDownload } from "react-icons/fi";
import "../../../style/Button.css"
import { useDispatch, useSelector } from "react-redux";
import { useGetStudentsPaymentsQuery } from "../../../services/api/endPoints/student.payment.endpoints";
import { useMemo } from "react";

export default function StudentPaymentPage() {
    const dispatch = useDispatch();
    const { searchText, currentPage, pageSize } = useSelector(
        (state) => state.payment
    );

    const { data, isLoading, isError, error } = useGetStudentsPaymentsQuery({
            page: currentPage,
            limit: pageSize,
            search: searchText,
        });

        const studentsPayments = useMemo(() => {
            const rawStudentsPayment = data?.data?.studentsPayments || [];

            return rawStudentsPayment.map((studentsPayment) => ({
                key: studentsPayment._id,
                orderId: studentsPayment.orderId,
                paymentId: studentsPayment.paymentId,
                creditId: studentsPayment.creditId,
                amount: studentsPayment.amount,
                status: studentsPayment.status,
            }));
        }, [data]);

    return (
        <div className="page-container">
            <div className="students-header">
                <h2>
                    Students Payment
                </h2>
                <HStack gap={10} >
                    <SearchBar
                        value=""
                    />
                    <Button className="btn export-btn">
                        <FiDownload className="btn-icon" />
                        Export CSV
                    </Button>
                </HStack>
            </div>
        </div >
    )
};