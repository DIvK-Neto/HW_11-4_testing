export default function detectCardType(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (!digits) return null;

  if (/^4/.test(digits)) return 'visa';
  if (
    /^5[1-5]/.test(digits) ||
    /^2(2[2-9][1-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(digits)
  )
    return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (
    /^6(011|5|4[4-9]|22(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/.test(
      digits
    )
  )
    return 'discover';
  if (/^35(2[8-9]|[3-8][0-9])/.test(digits)) return 'jcb';
  if (/^3(0[0-5]|[68]|9[0-9])/.test(digits)) return 'diners';
  if (/^2/.test(digits)) return 'mir';

  return null;
}
