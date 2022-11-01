import React from 'react';

import greyLogo from "../images/nopeflix-logo-grey.png";

import "../css/footer.scss";

export default function Footer() {
    return (
        <footer>
            <img src={greyLogo} alt="Nopeflix" />
            <section>
                <span>
                    Owner:
                    &nbsp;
                    <a href="https://github.com/AlinAlexandruPeter/nopeflix">AlinAlexandruPeter</a>
                </span>
                <span>
                    <a href="https://github.com/AlinAlexandruPeter/nopeflix">
                        <i className="fa-brands fa-github"></i>
                    </a>
                </span>
                <span>
                    <a href="https://www.themoviedb.org/documentation/api" target="_blank">
                        API
                    </a>
                </span>
                <span>
                    <i className="fa-regular fa-copyright"></i>
                    &nbsp;
                    All rights reserved
                </span>
            </section>
        </footer>
    )
};
