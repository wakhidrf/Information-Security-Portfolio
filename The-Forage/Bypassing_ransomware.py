from zipfile import ZipFile

def attempt_extract(zf_handle, password):
    try:
        zf_handle.extractall(pwd=password)
        return True
    except:
        return False

def main():
    print("[+] Beginning bruteforce ")
    with ZipFile('enc.zip') as zf:
        with open('rockyou.txt', 'rb') as f:
            for p in f:
                password = p.strip()
                if attempt_extract(zf, password):
                    print("[+] Correct password: %s" % password)
                    exit(0)
                else:
                    print("[-] Incorrect password: %s" % password)

    print("[+] Password not found in list")

if __name__ == "__main__":
    main()