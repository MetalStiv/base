import React, { useEffect, useState } from "react";
import { useUserId } from "../../hooks/useUserId";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ITransactionDto } from '../../../../shared/types/dto/transaction-dto';
import { transactionMicroservice } from "../../constants/axios-microservices";
import { Header } from "./header";
import { UpdateTransactionForm } from "./update-transasction-form";
import ConfirmationDialog from "../../components/confirmation-dialog";

export interface ITransactionPageProps {
    isSignedIn: boolean;
}
 
export const TransactionsPage = ({isSignedIn}: ITransactionPageProps) => {
    // const userId = useUserId();
    const navigate = useNavigate();

    if (!isSignedIn){
        navigate(-1);
    }

    const [transactionsDto, setTransactionsDto] = useState<ITransactionDto[]>([]);

    const updateTransactions = () => {
        async function getTransactions(){
            const response = await transactionMicroservice.get('getTransactions');
            if (response.status !== 200){
                throw response.status;
            }
            setTransactionsDto(response.data)
        }
        getTransactions(); 
    }

    useEffect(() => {
        updateTransactions();
    }, []);

    const deleteTransaction: (id: string) => void = (id) => {
        async function deleteRequest(id: string){
            await transactionMicroservice.delete('deleteTransaction', {
                data: {
                    '_id': id
                }
            });
            updateTransactions();
        }
        deleteRequest(id);
    }

    return (
        <div style={{margin: 16}}>
            <Header />

            <div style={{width: '10vw'}}>
                <UpdateTransactionForm updateTransactions={updateTransactions} />
            </div>

            {
                transactionsDto.map((transactionDto) => (
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
                                        <UpdateTransactionForm transactionDto={transactionDto} updateTransactions={updateTransactions} />
                                        <ConfirmationDialog 
                                            showText='Delete'
                                            btnAcceptText='Delete'
                                            btnDeclineText='Cancel'
                                            question='Are you shure you want to delete transaction?'
                                            action={() => deleteTransaction(transactionDto._id!)}
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