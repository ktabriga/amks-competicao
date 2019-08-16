const required = (value, msg= 'Required') => (value || typeof value === 'number' ? undefined : msg)

export default {
  required
}

