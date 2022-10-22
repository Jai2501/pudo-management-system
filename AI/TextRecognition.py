import cv2
import pytesseract
import time
import easyocr

cam = cv2.VideoCapture(0)
cv2.namedWindow("AI")
img_counter = 0

def ocr_core(img):
    text = pytesseract.image_to_string(img)
    return text

def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def remove_noise(image):
    return cv2.medianBlur(image, 5)

def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

while True:
    ret, frame = cam.read()
    if not ret:
        print("failed to grab frame")
        break
    cv2.imshow("test", frame)

    k = cv2.waitKey(1)

    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif k%256 == 32:
        # SPACE pressed
        # img_name = "opencv_frame_{}.png".format(img_counter)
        img_name = "trial.png"

        cv2.imwrite(img_name, frame)

        time.sleep(0.2)

        img = cv2.imread("trial.png")

        print("Trying to read EasyOCR")
        reader = easyocr.Reader(['en'])
        result = reader.readtext(img)
        print(result)

        time.sleep(0.1)

        img = get_grayscale(img)
        img = thresholding(img)
        img = remove_noise(img)

        print("Trying to read OCR")
        print(ocr_core(img))

        # cv2.imwrite(img_name, frame)
        # print("{} written!".format(img_name))
        # img_counter += 1

cam.release()

cv2.destroyAllWindows()