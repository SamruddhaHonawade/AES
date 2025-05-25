# pip install pycryptodome 

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes

def encrypt_content(plain_text: bytes, key: bytes) -> bytes:
    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded_data = pad(plain_text, AES.block_size)
    encrypted_data = cipher.encrypt(padded_data)
    return iv + encrypted_data

def decrypt_content(encrypted_data: bytes, key: bytes) -> bytes:
    iv = encrypted_data[:16]
    encrypted_data = encrypted_data[16:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded_data = cipher.decrypt(encrypted_data)
    plain_text = unpad(padded_data, AES.block_size)
    return plain_text

def main():
    key = b'This is a key123'  

   
    user_input = input("Enter the text to encrypt: ")
    original_content = user_input.encode()

  
    encrypted_content = encrypt_content(original_content, key)
    print("\nEncrypted content (hex):")
    print(encrypted_content.hex())

   
    decrypted_content = decrypt_content(encrypted_content, key)
    print("\nDecrypted content:")
    print(decrypted_content.decode())

if __name__ == "__main__":
    main()
