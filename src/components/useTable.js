import React, {useState} from "react";
import {makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            fontSize: 'small',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
}))

/**
 *
 * @param records
 * @param headCells
 * @returns {{TblHead: (function(): JSX.Element), TblContainer: (function(*): JSX.Element), recordsAfterPagingAndSorting: (function(): *), TblPagination: (function(): JSX.Element)}}
 */
const useTable = (records, headCells, filterFn) => {

    const classes = useStyles();
    const pages = [5, 10, 20];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();


    /**
     * The TableContainer
     * @param props
     * @returns {JSX.Element}
     * @constructor
     */
    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )


    /**
     * The TableHeader
     *

     * @returns {JSX.Element}
     * @constructor
     */
    const TblHead = () => {

        const handleSortRequest = (cellId) => {
            const isAsc = orderBy === cellId && order === 'asc';
            setOrderBy(cellId);
            setOrder(isAsc ? 'desc' : 'asc');

        }
        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell key={headCell.id}
                                       sortDirection={orderBy === headCell.id ? order : false}
                            >
                                {headCell.disableSorting ? headCell.label :
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : "asc"}
                                        onClick={() => {
                                            handleSortRequest(headCell.id)
                                        }}>
                                        {headCell.label}
                                    </TableSortLabel>
                                }
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const recordsAfterPagingAndSorting = () => {
        const filteredItems = filterFn ? filterFn.fn(records) : records;
        const sortedRecords = stableSort(filteredItems, getComparator(order, orderBy));
        return sortedRecords.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }


    //  TablePagination
    /**
     *
     * @returns {JSX.Element}
     * @constructor
     */
    const TblPagination = () => {
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        }
        const handleChangeRowsPerPage = event => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0);
        }
        return (
            <TablePagination
                component="div"
                page={page}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={records.length}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        )
    }
    return {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting}
}
export default useTable;
