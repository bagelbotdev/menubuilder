chrome.devtools.network.onRequestFinished.addListener(function (evt) {
  if (evt.request.method != "POST") return;

  const { itemGuid, itemGroupGuid, modifierGroups } = JSON.parse(
    evt.request.postData.text
  )[0].variables.input.selection;

  if (!itemGuid || !itemGroupGuid || !modifierGroups) return;

  const name = prompt(`enter name for ${itemGroupGuid}:${itemGuid}`);
  const keywords = prompt(
    `enter keywords for ${itemGroupGuid}:${itemGuid} (space delimited)`
  );
  const price = Number.parseFloat(
    prompt(`price for ${itemGroupGuid}:${itemGuid}`)
  );

  if (isNaN(price)) {
    alert("invalid number. insert failed");
    return;
  }

  document.querySelector("#container").value += JSON.stringify(
    {
      name,
      keywords: keywords.split(" "),
      price,
      balsam_item_guid: itemGuid,
      balsam_group_guid: itemGroupGuid,
      balsam_modifiers: modifierGroups.map((modifierGrp) => ({
        modifier_set_guid: modifierGrp.guid,
        modifiers: modifierGrp.modifiers.map((modifier) => ({
          modifier_group_guid: modifier.itemGroupGuid,
          modifier_guid: modifier.itemGuid,
        })),
      })),
    },
    2
  );

  document.querySelector("#container").value += "\n\n";
});

document.addEventListener("DOMContentLoaded", (evt) => {
  document.querySelector("#clear-button").addEventListener("click", (evt) => {
    document.querySelector("#container").value = "";
  });
});
