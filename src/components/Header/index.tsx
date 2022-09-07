// eslint-disable-next-line no-use-before-define
// import { ChainId } from '@kyberswap/ks-sdk-core'
// import { Trans } from '@lingui/macro'
import { darken } from 'polished'
import { useState } from 'react'
// import { Repeat } from 'react-feather'
import { Link, NavLink, useLocation } from 'react-router-dom'
// import { Flex } from 'rebass'
import styled, { keyframes } from 'styled-components'

// import { ReactComponent as MasterCard } from 'assets/buy-crypto/master-card.svg'
// import { ReactComponent as Visa } from 'assets/buy-crypto/visa.svg'
// import { ReactComponent as Dollar } from 'assets/svg/dollar.svg'
import { ReactComponent as DropdownSVG } from 'assets/svg/down.svg'
// import DiscoverIcon from 'components/Icons/DiscoverIcon'
import Menu from 'components/Menu'
import Settings from 'components/Settings'
// import { TutorialIds } from 'components/Tutorial/TutorialSwap/constant'
import Web3Network from 'components/Web3Network'
// import { PROMM_ANALYTICS_URL } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import useMixpanel from 'hooks/useMixpanel'
import { useWindowSize } from 'hooks/useWindowSize'
import { useIsDarkMode } from 'state/user/hooks'
import { ExternalLink } from 'theme/components'

import { RowFixed } from '../Row'
import Web3Status from '../Web3Status'

// const VisaSVG = styled(Visa)`
//   path {
//     fill: ${({ theme }) => theme.text};
//   }
// `

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 98;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.background};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

// const HeaderLinks = styled(Row)`
//   justify-content: center;

//   ${({ theme }) => theme.mediaWidth.upToLarge`
//     justify-content: flex-end;
//   `};
// `

const IconImage = styled.img`
  width: 140px;
  margin-top: 1px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 114px;
  `};

  @media only screen and (max-width: 400px) {
    width: 100px;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.background : theme.buttonGray)};
  border-radius: 999px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
`

// const AnalyticsWrapper = styled.span`
//   @media (max-width: 1320px) {
//     display: none;
//   }
// `

// const DiscoverWrapper = styled.span`
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     display: none;
//   `};
// `

// const CampaignWrapper = styled.span``

// const AboutWrapper = styled.span`
//   @media (max-width: 1440px) {
//     display: none;
//   }
// `

const Title = styled(Link)`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;

  :hover {
    transform: rotate(-5deg);
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    :hover {
      transform: rotate(0);
    }
  `}
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.subText};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
  }

  :hover {
    color: ${({ theme }) => darken(0.1, theme.primary)};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 8px 6px;
  `}
`

const StyledNavExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.subText};
  font-size: 1rem;
  width: fit-content;
  padding: 8px 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.subText};
  }

  :hover {
    color: ${({ theme }) => darken(0.1, theme.primary)};
    text-decoration: none;
  }

  :focus {
    color: ${({ theme }) => theme.subText};
    text-decoration: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
  `}
`

const YieldMenuWrapper = styled.div`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
  `}
  position: relative;
`

const shine = keyframes`
  0% {
    background-position: 0;
  }
  60% {
    background-position: 40px;
  }
  100% {
    background-position: 65px;
  }
`

export const SlideToUnlock = styled.div<{ active?: boolean }>`
  background: linear-gradient(
    to right,
    ${props => (props.active ? props.theme.primary : props.theme.subText)} 0,
    white 10%,
    ${props => (props.active ? props.theme.primary : props.theme.subText)} 20%
  );
  animation: ${shine} 1.3s infinite linear;
  animation-fill-mode: forwards;
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
`

const Dropdown = styled.div`
  display: none;
  position: absolute;
  background: ${({ theme }) => theme.tableHeader};
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.36));
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 24px rgba(0, 0, 0, 0.04),
    0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 16px;
  padding: 8px;
  width: max-content;
  top: 32px;
`
const DropdownIcon = styled(DropdownSVG)`
  transition: transform 300ms;
`

const HoverDropdown = styled.div<{ active: boolean }>`
  position: relative;
  display: inline-block;
  cursor: pointer;

  color: ${({ theme, active }) => (active ? theme.primary : theme.subText)};
  font-size: 1rem;
  width: fit-content;
  padding: 8px 6px 8px 12px;
  font-weight: 500;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 8px 2px 8px 6px;
  `}

  :hover {
    color: ${({ theme }) => darken(0.1, theme.primary)};

    ${Dropdown} {
      display: flex;
      flex-direction: column;

      ${StyledNavLink} {
        margin: 0;
      }
    }

    ${DropdownIcon} {
      transform: rotate(-180deg);
    }
  }
`

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const isDark = useIsDarkMode()
  const { pathname } = useLocation()
  const [isHoverSlide, setIsHoverSlide] = useState(false)

  const { width } = useWindowSize()

  const under369 = width && width < 369
  const under500 = width && width < 500
  const { mixpanelHandler } = useMixpanel()
  return (
    <HeaderFrame>
      <HeaderRow>
        <Title to="/swap">
          <UniIcon>
            <IconImage src={isDark ? '/logo-dark.svg' : '/logo.svg'} alt="logo" />
          </UniIcon>
        </Title>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <Web3Network />

          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
