import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Header } from "./header";
import { UpdateTransactionForm } from "./update-transasction-form";
import ConfirmationDialog from "../../components/confirmation-dialog";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/slices/user-slice";
import { useDeleteTransactionMutation, useGetTransactionsQuery } from "../../store/slices/transactions-api";
 
export const TransactionsPage = () => {
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const [deleteTransaction] = useDeleteTransactionMutation();

    const {data: transactionsDto, isFetching} = useGetTransactionsQuery();

    if (isFetching){
        return <h1>Loading...</h1>;
    }

    if (userId === ''){
        navigate('/');
    }

    const handleDeleteTransaction: (id: string) => void = (id) => {
        deleteTransaction({_id: id})
    }

    return (
        <div style={{margin: 16}}>
            <Header />

            <div style={{width: '10vw'}}>
                <UpdateTransactionForm />
            </div>

            {
                transactionsDto?.map((transactionDto) => (
                    <Card
                        border={transactionDto.input ? 'success' : 'danger'}
                        text='black'
                        key={transactionDto._id}
                        style={{marginTop: '2vh'}}
                    >
                        <Card.Header>
                            {`${transactionDto.input ? 'Income' : 'Outcome'} ${new Date(transactionDto.dateTime).toLocaleString('ru-Ru')}`}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{transactionDto.amount}</Card.Title>
                            <Card.Text>
                                <div style={{display: 'flex', gap: 16, width: '100%'}}>
                                    <div style={{width: '90%'}}>
                                        {transactionDto.comment}
                                    </div>
                                    <div style={{width: '10%', display: 'flex', gap: 8}}>
                                        <UpdateTransactionForm transactionDto={transactionDto} />
                                        <ConfirmationDialog 
                                            showText='Delete'
                                            btnAcceptText='Delete'
                                            btnDeclineText='Cancel'
                                            question='Are you shure you want to delete transaction?'
                                            action={() => handleDeleteTransaction(transactionDto._id!)}
                                        />
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
}