import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rabat = 0.07;
function ccyFormat(num) {
  return`${num.toFixed(2)}`;
}

function calcResult(qty,unit) {
  return qty*unit;
}

function createRow (desc,qty,unit){
  const result = calcResult(qty,unit);
  return {desc,qty,unit,result};
}

function subTotal(items) {
  return items.map(({result}) => result).reduce((sum,i) => sum + i, 0) ;
}



const rows = [
  createRow('Unit_1',1,1.0),  
  createRow('Unit_2',2,2.0),
  createRow('Unit_3',3,3.0),
  createRow('Unit_4',4,4.0)
];

const invoiceSubTotal = subTotal(rows);
const invoiceTaxes = invoiceSubTotal * rabat;
const invoiceTotal = invoiceSubTotal + invoiceTaxes;


export default function SpanningTable() {
  return (
 
    <TableContainer component = {Paper}>
      <Table sx = {{minWidth: 700}} aria-label = "spanning table">
        <TableHead>

          <TableRow>
            <TableCell align = "center" colspan = {3}>
              Details
            </TableCell>
            <TableCell align = "right">
              Price
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Desc </TableCell>
            <TableCell align = "right">Qty.</TableCell>
            <TableCell align = "right">Unit</TableCell>
            <TableCell align = "right">Result</TableCell> 
          </TableRow>  

        </TableHead>
        <TableBody>
          {rows.map((row) => ( 
            <TableRow key = {row.desc}>  
              <TableCell>{row.desc}</TableCell>
              <TableCell align = "right">{row.qty}</TableCell>
              <TableCell align = "right">{row.unit}</TableCell>
              <TableCell align = "right">{row.result}</TableCell>   
            </TableRow>
          ))} 
            <TableRow>
              <TableCell rowspan = {3}/>
              <TableCell colspan = {2}>Subtotal</TableCell>
              <TableCell align="right" >{ccyFormat(invoiceSubTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rabat</TableCell>
              <TableCell align="right" >{`${(rabat*100).toFixed(0)}%`}</TableCell>
              <TableCell align="right" >{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan = {2}>Total</TableCell>
              <TableCell align="right" >{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
            
        </TableBody>


      </Table>
    </TableContainer>

  );

}