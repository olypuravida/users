import React from 'react'
import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from '@react-email/components'

import { BASE_URL } from '@/domain/constants/app'
import type { VerifyEmailTemplateProps } from './types'
import styles from './styles'

export function VerifyEmailTemplate(props: Readonly<VerifyEmailTemplateProps>) {
  const { token, username } = props
  const verifyUrl = `${BASE_URL}api/auth/verify/email?token=${token}`

  return (
    <Html lang="en">
      <Head />

      <Preview>Mindflics - Verify Email</Preview>

      <Body style={ styles.main }>
        <Container style={ styles.container }>
          <Section style={ styles.message }>
            <Img
              alt="Logo"
              height={ 100 }
              src={ `${BASE_URL}/logo.png` }
              style={ styles.logo }
              width="auto"
            />
          </Section>

          <Section style={ styles.details }>
            <Text style={ styles.text }>{ `Hi ${username}!` }</Text>

            <Text style={ styles.text }>{ 'Welcome to Mindflics. Thanks for signing up!' }</Text>

            <br />

            <br />

            <Text style={ styles.text }>{ 'Please click the button below to verify your email address.' }</Text>

            <Button href={ verifyUrl } style={ styles.button } target='_blank'>
              Verify email
            </Button>

            <br />

            <br />

            <Text style={ styles.text }>
              Best,
              <br />
              The Mindflics team
            </Text>
          </Section>

          <Hr style={ styles.hr } />

          <Text style={ styles.footer }>
            @2024 Mindflics, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
