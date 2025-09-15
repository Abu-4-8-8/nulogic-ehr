import React from 'react'
import { Box, Typography } from '@mui/material'

interface NuLogicLogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  variant?: 'horizontal' | 'vertical'
}

const NuLogicLogo: React.FC<NuLogicLogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'horizontal' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { 
          containerWidth: 120,
          containerHeight: 30,
          iconSize: 30,
          iconTextGap: 6,
          nuLogicTextContainerWidth: 84,
          nuLogicTextContainerHeight: 25,
          nuTextWidth: 13,
          nuTextHeight: 15,
          nuTextTop: 3,
          logicTextWidth: 8,
          logicTextHeight: 15,
          logicTextTop: 3,
          logicTextLeft: 30,
          textPaddingTop: 1.5,
        }
      case 'large':
        return { 
          containerWidth: 200,
          containerHeight: 60,
          iconSize: 60,
          iconTextGap: 12,
          nuLogicTextContainerWidth: 168,
          nuLogicTextContainerHeight: 49,
          nuTextWidth: 25,
          nuTextHeight: 31,
          nuTextTop: 6,
          logicTextWidth: 15,
          logicTextHeight: 31,
          logicTextTop: 6,
          logicTextLeft: 50,
          textPaddingTop: 3,
        }
      default: // medium
        return { 
          containerWidth: 200,
          containerHeight: 40,
          iconSize: 40,
          iconTextGap: 8,
          nuLogicTextContainerWidth: 140,
          nuLogicTextContainerHeight: 40,
          nuTextWidth: 30,
          nuTextHeight: 32,
          nuTextTop: 4,
          logicTextWidth: 50,
          logicTextHeight: 32,
          logicTextTop: 4,
          logicTextLeft: 35,
          textPaddingTop: 0,
        }
    }
  }

  const { 
    containerWidth,
    containerHeight,
    iconSize,
    iconTextGap,
    nuLogicTextContainerWidth,
    nuLogicTextContainerHeight,
    nuTextWidth,
    nuTextHeight,
    nuTextTop,
    logicTextWidth,
    logicTextHeight,
    logicTextTop,
    logicTextLeft,
    textPaddingTop,
  } = getSize()

  const LogoIcon = () => (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 71 72" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M64.9589 59.2085C64.9589 63.3057 61.6251 66.6395 57.5279 66.6395H13.1207C9.0235 66.6395 5.68966 63.3057 5.68966 59.2085V12.778C5.68966 8.6808 9.0235 5.34697 13.1207 5.34697H57.5279C61.6251 5.34697 64.9589 8.6808 64.9589 12.778V46.3528C64.8103 47.4674 63.7463 53.0272 57.7711 53.0272C52.1134 53.0272 45.5437 45.407 42.757 41.2355C43.6015 39.8608 44.0473 38.2935 44.0473 36.6857C44.0473 34.8313 43.4697 33.0681 42.372 31.565L47.3406 25.7992C48.4958 26.4917 49.8098 26.8565 51.1541 26.8565C55.2682 26.8565 58.6155 23.5091 58.6155 19.395C58.6155 15.2809 55.2682 11.9336 51.1541 11.9336C47.04 11.9336 43.6927 15.2809 43.6927 19.395C43.6927 20.5536 43.9663 21.7054 44.4864 22.739L39.1969 28.8763C36.873 27.7211 34.0796 27.6705 31.6983 28.7682L29.9621 26.6876C30.7627 25.4682 31.1849 24.0631 31.1849 22.6072C31.1849 18.4932 27.8375 15.1458 23.7234 15.1458C19.6094 15.1458 16.262 18.4932 16.262 22.6072C16.262 26.7213 19.6094 30.0687 23.7234 30.0687C24.7908 30.0687 25.8244 29.8424 26.8006 29.3965L28.432 31.3556C27.2532 32.879 26.6047 34.7604 26.6047 36.6891C26.6047 38.1347 26.9728 39.5703 27.6686 40.8471L22.1832 47.2141C21.2746 46.8392 20.3221 46.6466 19.3459 46.6466C15.2318 46.6466 11.8844 49.994 11.8844 54.1081C11.8844 58.2222 15.2318 61.5695 19.3459 61.5695C23.46 61.5695 26.8073 58.2222 26.8073 54.1081C26.8073 52.5611 26.3344 51.0816 25.436 49.815L30.4992 43.9411C32.9008 45.5489 36.0049 45.8563 38.67 44.7382C41.0986 48.2004 49.0025 58.3843 57.7711 58.3843C66.5397 58.3843 69.8803 50.8215 70.2992 46.7953L70.3127 12.7848C70.3127 5.73541 64.5773 0 57.5279 0H13.1207C6.07135 0 0.335938 5.73541 0.335938 12.7848V59.2152C0.335938 66.2646 6.07135 72 13.1207 72H57.5279C64.5773 72 70.3127 66.2646 70.3127 59.2152V58.918H64.9623V59.2152L64.9589 59.2085ZM19.3425 57.4082C17.5219 57.4082 16.0424 55.9287 16.0424 54.1081C16.0424 52.2875 17.5219 50.808 19.3425 50.808C21.1631 50.808 22.6426 52.2875 22.6426 54.1081C22.6426 55.9287 21.1631 57.4082 19.3425 57.4082ZM23.7167 25.9039C21.8961 25.9039 20.4166 24.4245 20.4166 22.6039C20.4166 20.7833 21.8961 19.3038 23.7167 19.3038C25.5373 19.3038 27.0167 20.7833 27.0167 22.6039C27.0167 24.4245 25.5373 25.9039 23.7167 25.9039ZM39.0517 36.6857C39.0517 38.7427 37.3797 40.4147 35.3226 40.4147C33.2656 40.4147 31.597 38.7427 31.597 36.6857C31.597 34.6286 33.269 32.96 35.3226 32.96C37.3763 32.96 39.0517 34.632 39.0517 36.6857ZM51.1507 22.6951C49.3301 22.6951 47.8507 21.2156 47.8507 19.395C47.8507 17.5744 49.3301 16.095 51.1507 16.095C52.9713 16.095 54.4508 17.5744 54.4508 19.395C54.4508 21.2156 52.9713 22.6951 51.1507 22.6951Z" 
        fill="#008CEA"
      />
    </svg>
  )

  if (!showText) {
    return <LogoIcon />
  }

  if (variant === 'vertical') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          justifyContent: 'center',
        }}
      >
        <LogoIcon />
        {showText && (
          <Box
            sx={{
              position: 'relative',
              width: `${nuLogicTextContainerWidth}px`,
              height: `${nuLogicTextContainerHeight}px`,
              paddingTop: `${textPaddingTop}px`,
              mt: `${iconTextGap}px`,
            }}
          >
            <Typography
              sx={{
                fontSize: `${nuTextHeight}px`,
                fontWeight: 'bold',
                color: '#008CEA',
                lineHeight: 1,
                position: 'absolute',
                top: `${nuTextTop}px`,
                left: 0,
                width: `${nuTextWidth}px`,
                height: `${nuTextHeight}px`,
              }}
            >
              Nu
            </Typography>
            <Typography
              sx={{
                fontSize: `${logicTextHeight}px`,
                fontWeight: 'bold',
                color: '#4caf50',
                lineHeight: 1,
                position: 'absolute',
                top: `${logicTextTop}px`,
                left: `${logicTextLeft}px`,
                width: `${logicTextWidth}px`,
                height: `${logicTextHeight}px`,
              }}
            >
              Logic
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: `${iconTextGap}px`,
      }}
    >
      <LogoIcon />
      {showText && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: `${iconSize * 0.9}px`,
            lineHeight: 1,
            height: `${iconSize}px`,
            display: 'flex',
            alignItems: 'center',
            '& .nu': { color: '#008CEA' },
            '& .logic': { color: '#4caf50' },
          }}
        >
          <span className="nu">Nu</span><span className="logic">Logic</span>
        </Typography>
      )}
    </Box>
  )
}

export default NuLogicLogo
