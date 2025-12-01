import useTranslation from "@/locale";

export default function RulesModal() {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-100% relative px-20px pt-14px">
        <div className="w-100% flex justify-between font-bold">
          <div className="modal-title text-24px font-bold pl-40px pt-4px text-shadow1 color-[var(--vt-c-black-75)] overflow-hidden ">
            {t("Gameplay & Instructions")}
          </div>
          <div className="bg3-gray relative mt-2px pl-63px pr-14px box-border">
            <img
              src="/images/bg3-cai.png"
              className="w-596px h-47px absolute left-0 bottom-0 animate1"
              alt=""
            />
          </div>
        </div>
        <div className="w-100% mt-50px text-16px px-40px h-440px overflow-y-auto box-border">
          <div className="mb-6px">
            {t(
              "The game locks the upcoming Ethereum blockchain BlockHeight in advance. Before the block is generated, users can place bets predicting whether the last valid digit of the block's BlockHash is Big/Small or Odd/Even to determine winnings."
            )}
          </div>
          <div className="mb-6px">
            -{" "}
            {t(
              "Obtain the block hash for the draw, ignore all letters, and use the last digit as the result."
            )}
          </div>
          <div className="mb-6px">
            - {t("Winning numbers 5,6,7,8,9 are considered 'Big'.")}
          </div>
          <div className="mb-6px">
            - {t("Winning numbers 0,1,2,3,4 are considered 'Small'.")}
          </div>
          <div className="mb-6px">
            - {t("Winning numbers 1,3,5,7,9 are considered 'Odd'.")}
          </div>
          <div className="mb-6px">
            - {t("Winning numbers 0,2,4,6,8 are considered 'Even'.")}
          </div>
          <div className="mb-6px">
            -{" "}
            {t(
              "Example: If the block hash is 0x******a3B45E, the result is 'Big' and 'Odd'."
            )}
          </div>
          <div className="mb-6px">
            -{" "}
            {t(
              "After winning, the system automatically returns the corresponding assets based on the round's odds."
            )}
          </div>
          <div className="mb-6px">
            -{" "}
            {t(
              "Game odds range from 1:1.9 to 1:1.98. Please check the actual odds during gameplay."
            )}
          </div>
        </div>
      </div>
    </>
  );
}
