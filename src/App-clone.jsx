
import * as React from 'react';

/* functions for GRID (Header and Footer) */

import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

/* functions for Table (Items and Prices*/

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/* constants for  Header and Footer */

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const contentName = (
  <h1>
    BILL TO: Bjorn Borg
  </h1>
);

const contentInvoiceDate = (
  <h1>
    Invoice: 001    <br/>
    Date: 01.09.23
  </h1>
);

const contentShipping = (
  <div>
  <h3>
    Delivery address:
  </h3>   
    Bjorn Borg  <br/>
    1 MUI Drive <br/>
    Reactville, Anytown, 99999 <br/> 
    USA 
  </div>
);

const contentPaymentDetails = (
  <div>
    <h3>
    Payment details of seller:
    </h3>
    Card type Visa  <br/>
    Card holder Mr John Smith <br/>
    Card number xxxx-xxxx-xxxx-1234 <br/>
    Expiry date 04/2024
  </div>
);

/* function for Header and Footer */
function VerticalDividerText({content1,content2}) { 

  return (
    <Grid container>
      <Grid item xs>
        {content1}
      </Grid>
      <Divider orientation="vertical" flexItem>
      </Divider>
      <Grid align ="center" item xs>
        {content2}        
      </Grid>
    </Grid>
  );

}

/* constants for Items and Prices */

const tax = 0.07;

const rows = [
  createRow('Unit_1',1,1.0),  
  createRow('Unit_2',2,2.0),
  createRow('Unit_3',3,3.0),
  createRow('Unit_4',4,4.0)
];

const invoiceSubTotal = subTotal(rows);
const invoiceTaxes = invoiceSubTotal * tax;
const invoiceTotal = invoiceSubTotal + invoiceTaxes;

/* additiona functions for Items and Prices (function'Spanning Tables') */

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

/* Main Function */
export default function SpanningTable() {

  return (
    <>

    {/* Header */}
    <VerticalDividerText content1={contentName} content2={contentInvoiceDate} /> 
    
    {/* Items and Prices*/}
    <TableContainer >
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
              <TableCell>TAX</TableCell>
              <TableCell align="right" >{`${(tax*100).toFixed(0)}%`}</TableCell>
              <TableCell align="right" >{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan = {2}>Total</TableCell>
              <TableCell align="right" >{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
            
        </TableBody>


      </Table>
    </TableContainer>

    {/* Footer */}
    <VerticalDividerText content1={contentShipping} content2={contentPaymentDetails} />
   
    </>
  );

}