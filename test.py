from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend

# Use a fixed 32-byte key and 16-byte IV (for learning only, not secure for real use)
key = b'0123456789abcdef0123456789abcdef'  # 32 bytes for AES-256
iv = b'abcdef9876543210'  # 16 bytes IV

def encrypt(text):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    padder = padding.PKCS7(128).padder()
    padded_text = padder.update(text.encode()) + padder.finalize()
    encryptor = cipher.encryptor()
    return encryptor.update(padded_text) + encryptor.finalize()

def decrypt(ciphertext):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_padded = decryptor.update(ciphertext) + decryptor.finalize()
    unpadder = padding.PKCS7(128).unpadder()
    return unpadder.update(decrypted_padded) + unpadder.finalize()

# Example usage
plain_text = input("Enter text to encrypt: ")
cipher_text = encrypt(plain_text)
print("Encrypted:", cipher_text.hex())

decrypted_text = decrypt(cipher_text)
print("Decrypted:", decrypted_text.decode())
