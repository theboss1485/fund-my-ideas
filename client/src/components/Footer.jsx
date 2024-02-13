import { useState, useEffect } from 'react';

export default function Footer() {
    return (
        <div className="custom-footer">
            <ul className="custom-footer-content">
                <p>Copyright © 2024 Fund My Idea$</p>
                <p>Github Link:</p>
                <div className='custom-github-links-container'>
                    <a href="https://github.com/theboss1485">Gabriel</a>
                    <a href="https://github.com/Cyang0590">Chia</a>
                    <a href="https://github.com/KaarageOnigiri">Villy</a>
                </div>
            </ul>
        </div>
    )
}