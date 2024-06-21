"use client";

import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import styles from "./PaySlipForm.module.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PaySlipForm: React.FC = () => {
  const [headerImageBase64, setHeaderImageBase64] = useState<string | null>(
    null
  );
  const [footerImageBase64, setFooterImageBase64] = useState<string | null>(
    null
  );
  const [tableImageBase64, setTableImageBase64] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("");
  const [hrName, setHrName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [payPeriod, setPayPeriod] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [allowances, setAllowances] = useState("");
  const [bonus, setBonus] = useState("");
  const [lst, setLst] = useState("");
  const [nssf, setNssf] = useState("");
  const [paye, setPaye] = useState("");
  const [netPay, setNetPay] = useState("");

  useEffect(() => {
    const getBase64ImageFromUrl = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const fetchImages = async () => {
      try {
        const headerBase64 = await getBase64ImageFromUrl("/assets/header.png");
        const footerBase64 = await getBase64ImageFromUrl("/assets/footer.png");
        const tableBase64 = await getBase64ImageFromUrl("/assets/table.png");
        setHeaderImageBase64(headerBase64);
        setFooterImageBase64(footerBase64);
        setTableImageBase64(tableBase64);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const tableData = [
    { title: "TITLE", titleX: 60, titleY: 300 },
    { title: "AMOUNT", titleX: 400, titleY: 300 },
    {
      title: "Basic Pay",
      amount: basicPay,
      titleX: 60,
      titleY: 335,
      amountX: 400,
      amountY: 335,
    },
    {
      title: "Allowances",
      amount: allowances,
      titleX: 60,
      titleY: 370.5,
      amountX: 400,
      amountY: 370.5,
    },
    {
      title: "Bonus",
      amount: bonus,
      titleX: 60,
      titleY: 410,
      amountX: 400,
      amountY: 410,
    },
    {
      title: "LST",
      amount: lst,
      titleX: 60,
      titleY: 450,
      amountX: 400,
      amountY: 450,
    },
    {
      title: "NSSF",
      amount: nssf,
      titleX: 60,
      titleY: 488,
      amountX: 400,
      amountY: 488,
    },
    {
      title: "PAYE",
      amount: paye,
      titleX: 60,
      titleY: 522,
      amountX: 400,
      amountY: 522,
    },
    {
      title: "NET PAY: ",
      amount: netPay,
      titleX: 305,
      titleY: 575,
      amountX: 400,
      amountY: 574,
    },
  ];

  const handleDownloadPDF = async () => {
    if (!headerImageBase64 || !footerImageBase64 || !tableImageBase64) {
      console.error("Images not loaded yet");
      return;
    }

    const contentArray: any[] = [
      {
        image: headerImageBase64,
        width: 150,
        height: 100,
        alignment: "left",
        marginBottom: 10,
        marginTop: 30,
        absolutePosition: { x: 25, y: 20 },
      },
      {
        text: "Pay Slip",
        style: "header",
        absolutePosition: { x: 240, y: 133 },
      },
      { text: "\n" },
      orgName
        ? {
            text: [
              { text: "Organisation: ", style: "label" },
              { text: orgName, style: "dynamicValue" },
            ],
            absolutePosition: { x: 40, y: 180 },
          }
        : null,
      hrName
        ? {
            text: [
              { text: "HR: ", style: "label" },
              { text: hrName, style: "dynamicValue" },
            ],
            absolutePosition: { x: 40, y: 200 },
          }
        : null,
      employeeName
        ? {
            text: [
              { text: "Employee Name: ", style: "label" },
              { text: employeeName, style: "dynamicValue" },
            ],
            absolutePosition: { x: 40, y: 225 },
          }
        : null,
      payPeriod
        ? {
            text: [
              { text: "Pay Period: ", style: "label" },
              { text: payPeriod, style: "dynamicValue" },
            ],
            absolutePosition: { x: 40, y: 250 },
          }
        : null,
      { text: "\n" },
      {
        image: tableImageBase64,
        width: 500,
        absolutePosition: { x: 40, y: 290 },
      },
    ];

    // Adding table data with positions
    tableData.forEach((row) => {
      const isNetPay = row.title === "NET PAY: ";
      const isTitleOrAmount = row.title === "TITLE" || row.title === "AMOUNT";
      contentArray.push({
        text: row.title,
        absolutePosition: { x: row.titleX, y: row.titleY },
        bold: isNetPay || isTitleOrAmount,
        style: isNetPay
          ? "netPay"
          : isTitleOrAmount
          ? "tableHeader"
          : undefined,
      });
      contentArray.push({
        text: row.amount,
        absolutePosition: { x: row.amountX, y: row.amountY },
        style: isNetPay ? "netPay" : undefined,
      });
    });

    contentArray.push({
      absolutePosition: { x: 0, y: 800 },
      image: footerImageBase64,
      height: 30,
      width: 600,
      marginLeft: 40,
      marginRight: 40,
    });

    const docDefinition: TDocumentDefinitions = {
      content: contentArray,
      pageMargins: [40, 100, 40, 60],
      styles: {
        tableHeader: {
          fillColor: "#f2f2f2",
          bold: true,
          color: "white",
          fontSize: 12,
          alignment: "left",
        },
        tableExample: {
          margin: [0, 40, 0, 15],
          fontSize: 12,
        },
        header: {
          fontSize: 24,
          bold: true,
          marginBottom: 20,
          marginTop: 60,
        },
        netPay: {
          fontSize: 16,
          color: "white",
          bold: true,
        },
        label: {
          bold: true,
        },
        dynamicValue: {
          color: "black",
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download("PaySlip.pdf");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Pay Slip</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            if (row.title !== "TITLE" && row.title !== "AMOUNT") {
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td>{row.title}</td>
                  <td>
                    <input
                      type="text"
                      value={row.amount}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (row.title === "Basic Pay") setBasicPay(newValue);
                        if (row.title === "Allowances") setAllowances(newValue);
                        if (row.title === "Bonus") setBonus(newValue);
                        if (row.title === "LST") setLst(newValue);
                        if (row.title === "NSSF") setNssf(newValue);
                        if (row.title === "PAYE") setPaye(newValue);
                        if (row.title === "NET PAY: ") setNetPay(newValue);
                      }}
                    />
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>

      <details className={styles.details}>
        <summary className={styles.summary}>Additional Details</summary>
        <div className={styles.detailItem}>
          <label>
            Organization Name:
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.detailItem}>
          <label>
            HR Name:
            <input
              type="text"
              value={hrName}
              onChange={(e) => setHrName(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.detailItem}>
          <label>
            Employee Name:
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </label>
          <div className={styles.detailItem}>
            <label>
              Pay Period:
              <input
                type="text"
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value)}
              />
            </label>
          </div>
        </div>
      </details>

      <button onClick={handleDownloadPDF} className={styles.downloadButton}>
        Download Pay Slip PDF
      </button>
    </div>
  );
};

export default PaySlipForm;
