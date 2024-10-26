import React from 'react';
import useUserTemplateData from '../../../../Hooks/useUserTemplateData';
import { Page, Text, View, Document, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';
import Resume12 from './Resume12';
import Resume11 from './Resume11';
import Resume10 from './Resume10';
import Resume9 from './Resume9';
import Resume8 from './Resume8';
import Resume7 from './Resume7';
import Resume6 from './Resume6';
import Resume5 from './Resume5';
import Resume4 from './Resume4';
import Resume3 from './Resume3';
import Resume2 from './Resume2';
import Resume1 from './Resume1';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color: '#000',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#000',
  },
});

// PDF Document Component
const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.text}>{data.email}</Text>
        <Text style={styles.text}>{data.phone}</Text>
        <Text style={styles.text}>{data.experience}</Text>
        {/* Add more fields as necessary */}
      </View>
    </Page>
  </Document>
);

const ResumeMe = () => {
  const data = useUserTemplateData();
  const lastData = data?.data?.[data?.data.length - 1]; // Get the last element safely
  const templateId = lastData?.templateId; // Extract templateId

  if (!templateId || !lastData) {
    return (
      <p className='text-3xl text-center font-medium mt-4 mb-4 text-green-600'>
        No data available...
      </p>
    );
  }

  return (
    <div>
      <div id="resume">
        {templateId == 1 && <Resume1 props={lastData} />}
        {templateId == 2 && <Resume2 props={lastData} />}
        {templateId == 3 && <Resume3 props={lastData} />}
        {templateId == 4 && <Resume4 props={lastData} />}
        {templateId == 5 && <Resume5 props={lastData} />}
        {templateId == 6 && <Resume6 props={lastData} />}
        {templateId == 7 && <Resume7 props={lastData} />}
        {templateId == 8 && <Resume8 props={lastData} />}
        {templateId == 9 && <Resume9 props={lastData} />}
        {templateId == 10 && <Resume10 props={lastData} />}
        {templateId == 11 && <Resume11 props={lastData} />}
        {templateId == 12 && <Resume12 props={lastData} />}
      </div>
      {/* <PDFDownloadLink
        document={<ResumePDF data={lastData} />} // Pass the lastData as props to your PDF component
        fileName={`resume-template-${templateId}.pdf`}
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink> */}
    </div>
  );
};

export default ResumeMe;
