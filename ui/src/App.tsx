/**
 * This is the top-level component that defines your UI application.
 *
 * This is an appropriate spot for application wide components and configuration,
 * stuff like application chrome (headers, footers, navigation, etc), routing
 * (what urls go where), etc.
 *
 * @see https://github.com/reactjs/react-router-tutorial/tree/master/lessons
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Result, Spin } from '@allenai/varnish';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { LoginPage, PDFPage } from './pages';
import { AuthProvider } from './context';
import { CenterOnPage } from './components';
import ModalPopupImportDocuments from './components/sidebar/ModalPopupImportDocuments';
import { getAllocatedPaperStatus, PaperStatus } from './api';
import { QuestionCircleOutlined } from '@ant-design/icons';

const RedirectToFirstPaper = () => {
    const [papers, setPapers] = useState<PaperStatus[] | null>(null);

    useEffect(() => {
        getAllocatedPaperStatus().then((allocation) => setPapers(allocation?.papers || []));
    }, []);

    const content = useMemo(() => {
        if (!papers) {
            return (
                <CenterOnPage>
                    <Spin size="large" />
                </CenterOnPage>
            );
        }

        /** First available sha */
        const sha = papers.find((p) => !!p.sha)?.sha;
        if (!papers.length || !sha) {
            return (
                <CenterOnPage>
                    <Result icon={<QuestionCircleOutlined />} title="PDFs Not Found" />
                    <ModalPopupImportDocuments></ModalPopupImportDocuments>
                </CenterOnPage>
            );
        }

        return <Redirect to={`/pdf/${sha}`} />;
    }, [papers]);

    return content;
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Route path="/" exact component={RedirectToFirstPaper} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/pdf/:sha" component={PDFPage} />
            </BrowserRouter>
            <GlobalStyles />
        </AuthProvider>
    );
};

// Setup the viewport so it takes up all available real-estate.
const GlobalStyles = createGlobalStyle`
    html, body, #root {
        display: flex;
        flex-grow: 1;
    }
`;

export default App;
