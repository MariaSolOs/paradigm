import { useTheme } from '@mui/material/styles';
import type { FCC } from 'react';
import type { PixelSlideProps } from './index';

import Image from 'next/future/image';
import * as S from './PixelSlide.styled';

/**
 * @param mediaQuery - The media query string generated by Mui, which looks
 * like `@media (max-width:599.95px)`.
 * @returns The media query string without the `@media ` prefix.
 */
const getMediaQueryInfo = (mediaQuery: string) => mediaQuery.slice(mediaQuery.indexOf(' ') + 1);

const PixelSlide: FCC<PixelSlideProps> = (props) => {
    const theme = useTheme();

    return (
        <S.Slide>
            {props.image.alignment === 'right' && <S.TextContainer>{props.children}</S.TextContainer>}
            <S.ImageContainer>
                <Image
                fill
                style={{ objectFit: 'contain' }}
                sizes={`
                    ${getMediaQueryInfo(theme.breakpoints.down('sm'))} 100px,
                    ${getMediaQueryInfo(theme.breakpoints.down('md'))} 170px,
                    230px
                `}
                src={props.image.src} 
                alt={props.image.altText}
                quality={100} />
            </S.ImageContainer>
            {/* By default align to the left */}
            {props.image.alignment !== 'right' && <S.TextContainer>{props.children}</S.TextContainer>}
        </S.Slide>
    );
}

export default PixelSlide;