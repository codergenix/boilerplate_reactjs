import React from 'react';
import { Container } from 'react-bootstrap';
//----
const NotfoundScreen = () => {
    return (
        <section className="notfound-sec">
            <Container>
                <div className="text-center">
                    <h1>404</h1>
                    <h2>UH OH! You're lost.</h2>
                    <p>The page you are looking for does not exist.
                        How you got here is a mystery.
                    </p>
                </div>
            </Container>
        </section>
    )
}
export default React.memo(NotfoundScreen)
