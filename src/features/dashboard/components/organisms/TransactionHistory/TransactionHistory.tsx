import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GroupButton, Skeleton } from "@/components";
import { Typography } from "@/components/atoms";
import { useTransactionsQuery } from "@/services";
import type { Transaction } from "@/types";
import { TransactionRow } from "../../molecules";
import styles from "./TransactionHistory.module.css";

const STATUS_OPTIONS = [
	{ value: "completed", label: "Completado" },
	{ value: "pending", label: "Pendiente" },
	{ value: "rejected", label: "Rechazado" },
];

export function TransactionHistory() {
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState<string | undefined>(undefined);
	const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
	const mergedPageRef = useRef(0);

	const { data, isLoading, isFetching } = useTransactionsQuery({
		page,
		status,
	});

	const meta = data?.meta;
	const hasMore = meta ? meta.current_page < meta.total_pages : false;

	useEffect(() => {
		if (!data) return;
		const currentPage = data.meta.current_page;
		if (currentPage === 1) {
			mergedPageRef.current = 1;
			setAllTransactions(data.transactions);
		} else if (currentPage > mergedPageRef.current) {
			mergedPageRef.current = currentPage;
			setAllTransactions((prev) => [...prev, ...data.transactions]);
		}
	}, [data]);

	const loadMore = () => {
		if (!isFetching && hasMore) setPage((p) => p + 1);
	};

	const handleStatusChange = (status: string | null) => {
		setPage(1);
		setAllTransactions([]);
		setStatus(status ?? undefined);
	};

	return (
		<Skeleton loading={isLoading && page === 1}>
			<section className={styles.container}>
				<div className={styles.header}>
					<Typography variant="subtitle2" as="h2">
						Historial
					</Typography>
					<GroupButton
						options={STATUS_OPTIONS}
						value={status}
						onChange={handleStatusChange}
					/>
				</div>
				{allTransactions.length === 0 && !isLoading ? (
					<ul className={styles.list} aria-label="Historial de transacciones">
						<li>
							<Typography variant="body" as="p" className={styles.empty}>
								No hay transacciones
							</Typography>
						</li>
					</ul>
				) : (
					<InfiniteScroll
						dataLength={allTransactions.length}
						next={loadMore}
						hasMore={hasMore}
						loader={<p className={styles.empty}>Cargando...</p>}
						endMessage={
							allTransactions.length > 0 ? (
								<p className={styles.empty}>
									<Typography variant="body" as="span">
										Fin del historial
									</Typography>
								</p>
							) : null
						}
					>
						<ul className={styles.list} aria-label="Historial de transacciones">
							{allTransactions.map((tx) => (
								<li key={tx.id}>
									<TransactionRow transaction={tx} />
								</li>
							))}
						</ul>
					</InfiniteScroll>
				)}
			</section>
		</Skeleton>
	);
}
