import dayjs from 'dayjs';
import React from 'react';
import { Container } from 'react-bootstrap';
//---
const FooterComponent = () => {
    return (
        <Container className="text-center py-3">
            © Copyright {dayjs().year()} React
        </Container>
    );
}
export default React.memo(FooterComponent)
