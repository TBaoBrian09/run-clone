import React from 'react'
import {
  VerifiedIcon,
  CommunityIcon,
  RefreshIcon,
  AutoRenewIcon,
  TagProps,
  Tag,
  TimerIcon,
  BlockIcon,
  VoteIcon,
} from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { CoreTagIcon } from './Pancake-uikit'

const CoreTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <CoreTagIcon/>
  )
}

const CommunityTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="failure" outline startIcon={<CommunityIcon width="16px" color="failure" mr="4px" />} {...props}>
      {t('Community')}
    </Tag>
  )
}

const DualTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="textSubtle" outline {...props}>
      {t('Dual')}
    </Tag>
  )
}

const ManualPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="primary" outline startIcon={<RefreshIcon width="16px" color="primaryBright" mr="4px" />} {...props}>
      {t('Manual')}
    </Tag>
  )
}

const CompoundingPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" outline startIcon={<AutoRenewIcon width="16px" color="success" mr="4px" />} {...props}>
      {t('Auto')}
    </Tag>
  )
}

const VoteNowTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" startIcon={<VoteIcon width="16px" color="success" mr="4px" />} {...props}>
      {t('Vote Now')}
    </Tag>
  )
}

const SoonTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="binance" startIcon={<TimerIcon width="16px" color="success" mr="4px" />} {...props}>
      {t('Soon')}
    </Tag>
  )
}

const ClosedTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="primary" startIcon={<BlockIcon width="16px" color="textDisabled" mr="4px" />} {...props}>
      {t('Closed')}
    </Tag>
  )
}

export { CoreTag, CommunityTag, DualTag, ManualPoolTag, CompoundingPoolTag, VoteNowTag, SoonTag, ClosedTag }
