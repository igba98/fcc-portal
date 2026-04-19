import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#fff', padding: 50 },
  header: { fontSize: 18, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  subHeader: { fontSize: 14, textAlign: 'center', marginBottom: 30, color: '#1B3067' },
  title: { fontSize: 16, textAlign: 'center', marginBottom: 40, textTransform: 'uppercase', textDecoration: 'underline' },
  bodyText: { fontSize: 12, marginBottom: 15, lineHeight: 1.5 },
  label: { fontSize: 10, color: '#666', marginTop: 15 },
  value: { fontSize: 12, fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 50, left: 50, right: 50, textAlign: 'center', fontSize: 10, color: '#999', borderTop: '1px solid #eee', paddingTop: 10 }
});

const PdfTemplate = ({ tm }: { tm: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>THE UNITED REPUBLIC OF TANZANIA</Text>
      <Text style={styles.subHeader}>FAIR COMPETITION COMMISSION (FCC)</Text>
      
      <Text style={styles.title}>CERTIFICATE OF RECORDATION OF A TRADEMARK</Text>
      
      <Text style={styles.bodyText}>
        This is to certify that the trademark specified below has been recorded in the Customs 
        Recordation Register pursuant to the Merchandise Marks Act (Recordation of Trademarks) 
        Regulations, 2026.
      </Text>

      <Text style={styles.label}>Certificate Number:</Text>
      <Text style={styles.value}>{tm.certificate_no}</Text>

      <Text style={styles.label}>Trademark Name:</Text>
      <Text style={styles.value}>{tm.trademark_name}</Text>

      <Text style={styles.label}>Trademark Owner / Rights Holder:</Text>
      <Text style={styles.value}>{tm.owner_name}</Text>

      <Text style={styles.label}>Classes Covered:</Text>
      <Text style={styles.value}>{tm.classes?.map((c:any)=>c.number).join(', ')}</Text>

      <Text style={styles.label}>Effective Date of Recordation:</Text>
      <Text style={styles.value}>{tm.recorded_date}</Text>

      <Text style={styles.label}>Valid Until (Expiry Date):</Text>
      <Text style={styles.value}>{tm.expiry_date}</Text>

      <View style={{ marginTop: 60, width: 200 }}>
         <Text style={{ borderBottom: '1px solid #000', marginBottom: 5 }}></Text>
         <Text style={{ fontSize: 10, textAlign: 'center' }}>Director General / Chief Inspector</Text>
      </View>

      <Text style={styles.footer}>
         System Generated Certificate. Scan QR code to verify authenticity.
      </Text>
    </Page>
  </Document>
);

export const downloadCertificate = async (tm: any) => {
  const blob = await pdf(<PdfTemplate tm={tm} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${tm.certificate_no || 'fcc-cert'}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
